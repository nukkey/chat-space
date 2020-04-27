class Group < ApplicationRecord
  has_many :Group_users
  has_many :users, through: :Group_users
  has_many :messages
  validates :name, presence: true, uniqueness: true
end
