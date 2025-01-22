from typing import Optional, Dict, Any, List
from sqlmodel import SQLModel, Field, Relationship, Column, JSON
from .user import User


class Asset(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: Optional[str] = None
    asset_type: Optional[str] = Field(default=None)
    minio_path: str  # Path to asset in MinIO storage

    creator_id: int = Field(foreign_key="user.id")
    creator: User = Relationship(back_populates="created_assets")

    price: Optional[float] = None
    is_public: bool = Field(default=False)

    # Scalable controls for assets
    controls: Dict[str, Any] = Field(sa_column=Column(JSON), default={})

    # Relationships
    projects: List["ProjectAsset"] = Relationship(back_populates="asset")


class Favorite(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    user: User = Relationship(back_populates="favorites")

    asset_id: Optional[int] = Field(foreign_key="asset.id", default=None)
    template_id: Optional[int] = Field(foreign_key="template.id", default=None)
