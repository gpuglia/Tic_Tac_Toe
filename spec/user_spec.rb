require 'spec_helper'

describe User do
  it "validates email" do
    should respond_to(:valid?)
  end
end
