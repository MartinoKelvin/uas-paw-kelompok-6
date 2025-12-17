"""add_cascade_delete_to_package_relations

Revision ID: 8acc5ded4d7f
Revises: a7ceac839a80
Create Date: 2025-12-17 17:14:59.320431

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8acc5ded4d7f'
down_revision: Union[str, Sequence[str], None] = 'a7ceac839a80'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Drop existing foreign key constraints
    op.drop_constraint('bookings_package_id_fkey', 'bookings', type_='foreignkey')
    op.drop_constraint('reviews_package_id_fkey', 'reviews', type_='foreignkey')
    op.drop_constraint('reviews_booking_id_fkey', 'reviews', type_='foreignkey')
    
    # Recreate foreign key constraints with CASCADE delete
    op.create_foreign_key(
        'bookings_package_id_fkey',
        'bookings', 'packages',
        ['package_id'], ['id'],
        ondelete='CASCADE'
    )
    op.create_foreign_key(
        'reviews_package_id_fkey',
        'reviews', 'packages',
        ['package_id'], ['id'],
        ondelete='CASCADE'
    )
    op.create_foreign_key(
        'reviews_booking_id_fkey',
        'reviews', 'bookings',
        ['booking_id'], ['id'],
        ondelete='CASCADE'
    )


def downgrade() -> None:
    """Downgrade schema."""
    # Drop CASCADE foreign key constraints
    op.drop_constraint('bookings_package_id_fkey', 'bookings', type_='foreignkey')
    op.drop_constraint('reviews_package_id_fkey', 'reviews', type_='foreignkey')
    op.drop_constraint('reviews_booking_id_fkey', 'reviews', type_='foreignkey')
    
    # Recreate original foreign key constraints without CASCADE
    op.create_foreign_key(
        'bookings_package_id_fkey',
        'bookings', 'packages',
        ['package_id'], ['id']
    )
    op.create_foreign_key(
        'reviews_package_id_fkey',
        'reviews', 'packages',
        ['package_id'], ['id']
    )
    op.create_foreign_key(
        'reviews_booking_id_fkey',
        'reviews', 'bookings',
        ['booking_id'], ['id']
    )
