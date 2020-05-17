require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context 'messageを保存できる場合' do
      #1
      it 'メッセージがあれば保存できること' do
        expect(build(:message, image: nil)).to be_valid
      end

      #2
      it '画像があれば保存ができること' do
        expect(build(:message, content: nil)).to be_valid
      end

      #3
      it 'メッセージと画像があれば保存できること' do
        expect(build(:message)).to be_valid
      end
    end

    context 'messageを保存できない場合' do
      #4
      it 'メッセージも画像もないと保存できないこと' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include('を入力してください')
      end

      #5
      it 'group_idがないと保存できないこと' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end
      #5
      it 'user_idがないと保存できないこと' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end
  end
end