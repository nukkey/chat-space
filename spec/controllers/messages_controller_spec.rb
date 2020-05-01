require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'ログインしている場合' do
    # この中にログインしている場合のテストを記述
      before do
        login user
      end

      context '保存に成功した場合' do
      # この中にメッセージの保存に成功した場合のテストを記述
      end

      context '保存に失敗した場合' do
      # この中にメッセージの保存に失敗した場合のテストを記述
      end
    end

    context 'ログインしていない場合' do
    # この中にログインしていない場合のテストを記述
      before do
        get :create, params: params
      end

    end
  end
end