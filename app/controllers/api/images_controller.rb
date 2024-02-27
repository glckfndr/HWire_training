module Api
  class ImagesController < ApplicationController
    def update
      #puts params.inspect
      @image = Image.find params[:id]
      @image.update! title: params[:image][:title].strip
      head :ok
    end
  end
end
