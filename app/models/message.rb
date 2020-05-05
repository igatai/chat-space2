class Message < ApplicationRecord
  belongth_to :group
  belongth_to :user
  validates :content, presence: true, unless: :image?
  mount_uploader :image, ImageUploader
end
