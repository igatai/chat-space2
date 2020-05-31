class Api::MessagesController < ApplicationController

  def index
    # ルーティング設定によりparamsの中にgroup_idキーに対するグループIDvalueが入る
    group = Group.find(params[:group_id])
    # 最後にajaxで送られるメッセージのメッセージIDを取得
    last_message_id = params[:id].to_i
    # 取得したグループ内のメッセージから、last_message_idよりも新しいメッセージを取得
    @messages = group.messages.includes(:user).where("id > ?",last_message_id)
  end

end