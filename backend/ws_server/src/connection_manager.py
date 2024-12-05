import asyncio
import json
import logging
from typing import Dict, Any, Optional
from pathlib import Path
import tempfile

import websockets
from PIL import Image
import base64
import io


class WebSocketConnectionManager:
    """Manage WebSocket connections with improved error handling and logging."""

    def __init__(self, preview_dir: Optional[Path] = None):
        """
        Initialize the connection manager.

        :param preview_dir: Directory for storing preview frames
        """
        self.logger = logging.getLogger(__name__)
        self.connections: Dict[str, websockets.WebSocketServerProtocol] = {}
        self.preview_dir = preview_dir or Path(
            tempfile.gettempdir()) / "box_preview"
        self.preview_dir.mkdir(exist_ok=True, parents=True)

        # Create a thread-safe event for frame broadcasting
        self.frame_broadcast_event = asyncio.Event()
        self.stop_broadcast_event = asyncio.Event()

    async def send_message(self, websocket: websockets.WebSocketServerProtocol, message: Dict[str, Any]):
        """
        Send a message to a specific WebSocket client with robust error handling.

        :param websocket: Target WebSocket connection
        :param message: Message to send
        """
        try:
            serialized_message = json.dumps(message)
            await websocket.send(serialized_message)
            self.logger.info(
                f"Message sent to client: {message}")
        except websockets.exceptions.ConnectionClosed:
            self.logger.warning(
                f"Cannot send message: Connection to client closed")
        except Exception as e:
            self.logger.error(f"Error sending message: {e}")

    def register_connection(self, client_id: str, websocket: websockets.WebSocketServerProtocol):
        """
        Register a new WebSocket connection.

        :param client_id: Unique identifier for the client
        :param websocket: WebSocket connection
        """
        if client_id in self.connections:
            self.logger.warning(
                f"Replacing existing connection for client {client_id}")

        self.connections[client_id] = websocket
        self.logger.info(f"Client {client_id} connected")

    def unregister_connection(self, client_id: str):
        """
        Remove a WebSocket connection.

        :param client_id: Unique identifier for the client
        """
        if client_id in self.connections:
            del self.connections[client_id]
            self.logger.info(f"Client {client_id} disconnected")

    async def broadcast_frame(self):
        """
        Continuously broadcast new frames to browser client with improved efficiency.
        Uses an event to control broadcasting and prevent unnecessary processing.
        """
        try:
            while not self.stop_broadcast_event.is_set():
                # Wait for new frames or a signal
                await self.frame_broadcast_event.wait()

                # Find and broadcast frames
                frames = sorted(self.preview_dir.glob("frame_*.png"))
                for frame in frames:
                    if self.stop_broadcast_event.is_set():
                        break

                    if 'browser' in self.connections:
                        # Convert frame to base64 efficiently
                        with Image.open(frame) as img:
                            buffer = io.BytesIO()
                            img.save(buffer, format='PNG')
                            img_str = base64.b64encode(
                                buffer.getvalue()).decode()

                        await self.send_message(
                            self.connections['browser'],
                            {'type': 'frame', 'data': img_str}
                        )

                    # Small delay to prevent overwhelming the client
                    await asyncio.sleep(1/24)

                # Reset event
                self.frame_broadcast_event.clear()

        except Exception as e:
            self.logger.error(f"Error in frame broadcasting: {e}")
        finally:
            self.logger.info("Frame broadcasting stopped")
