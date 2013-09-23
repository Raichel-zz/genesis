class DecalsController < ApplicationController
  
  def wizard
    @themes = Theme.all
  end

  def list
    
  end

end
