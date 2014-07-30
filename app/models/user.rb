require 'bcrypt'

class User < ActiveRecord::Base
  validates :email, format: { with: /.*@.*\.com/, message: "Must be a valid email address" }
  validates :email, presence: true
  validates :email, uniqueness: true


  include BCrypt

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def self.authenticate(email, password)
  	user = User.find_by_email(email)
  	if user && user.password == password
  		return true
  	end
  end

end

