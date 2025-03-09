from . import (
    ws,
    core,
    assets,
    rendering,
    templates
)
import bpy

bl_info = {
    "name": "Cr8tive Engine",
    "author": "Thamsanqa Dreem",
    "version": (0, 0, 1),
    "blender": (4, 3, 0),
    "location": "View3D > Tools",
    "description": "Advanced Blender Automation System",
    "warning": "",
    "wiki_url": "",
    "category": "Development",
}


def register():
    """Register all components of the addon"""
    ws.register()


def unregister():
    """Unregister all components of the addon"""
    ws.unregister()


if __name__ == "__main__":
    register()
