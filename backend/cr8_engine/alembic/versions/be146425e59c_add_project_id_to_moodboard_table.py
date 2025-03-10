"""Add project_id to moodboard table

Revision ID: be146425e59c
Revises: 912d540fd41c
Create Date: 2025-01-23 17:02:29.164615

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'be146425e59c'
down_revision = '912d540fd41c'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('moodboard', sa.Column('project_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'moodboard', 'project', ['project_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'moodboard', type_='foreignkey')
    op.drop_column('moodboard', 'project_id')
    # ### end Alembic commands ###
