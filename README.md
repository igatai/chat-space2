# README


# Chatspace Model Design

### users table
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false,index: true|
|group|references|null: false,foreign_key: true|
|group|references|null: false,foreign_key: true|

##### Association
- has_many :group_users
- has_many :groups, through: :groups_users
- has_many :message

### groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null :false|

##### Association
- has_many :group_users
- has_many :users, through: :groups_users
- has_many :message

### message table
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||

##### Association
- belongs_to :group
- belongs_to :user

### group_users table
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

##### Association
- belongs_to :group
- belongs_to :user