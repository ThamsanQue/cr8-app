"""add created_at and updated_at to template

Revision ID: baaa4365f791
Revises: 93d0d194a5a7
Create Date: 2025-02-19 17:13:40.505569

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'baaa4365f791'
down_revision = '93d0d194a5a7'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('template', sa.Column('created_at', sa.DateTime(), nullable=False))
    op.add_column('template', sa.Column('updated_at', sa.DateTime(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('template', 'updated_at')
    op.drop_column('template', 'created_at')
    # ### end Alembic commands ###
