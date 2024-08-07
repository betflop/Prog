"""empty message

Revision ID: a7688fc26fd9
Revises: 6176e9b8b8ab
Create Date: 2023-12-28 23:49:16.997862

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a7688fc26fd9'
down_revision: Union[str, None] = '6176e9b8b8ab'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('history', sa.Column('question_id', sa.Integer(), nullable=True))
    op.add_column('history', sa.Column('date', sa.Date(), nullable=True))
    op.create_foreign_key(None, 'history', 'questions', ['question_id'], ['id'])
    op.drop_column('history', 'last_request')
    op.drop_column('history', 'last_date')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('history', sa.Column('last_date', sa.DATE(), autoincrement=False, nullable=True))
    op.add_column('history', sa.Column('last_request', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'history', type_='foreignkey')
    op.drop_column('history', 'date')
    op.drop_column('history', 'question_id')
    # ### end Alembic commands ###
