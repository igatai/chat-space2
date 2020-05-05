class GroupsController < ApplicationController


  def index
  end
  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    # binding.pry
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def edit
    @group = Group.find(params[:id])
    redirect_to 
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to root_path, notice: 'グループを更新しました'
    else
      render :edit
    end
  end

  def show
    @group = Group.find(params[:id])
    @messages = Message.where(group_id: @group.id)
    @member = @group.users
  end

  private
  def group_params
    params.require(:group).permit(:name, user_ids: [] )
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
