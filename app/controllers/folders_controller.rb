class FoldersController < ApplicationController
  def index
    @folders = Folder.order created_at: :desc
  end
end
