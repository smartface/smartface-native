require "jsduck/tag/boolean_tag"

class PlatformiOS < JsDuck::Tag::BooleanTag
  def initialize
    @pattern = "iOS"
    @signature = {:long => "iOS", :short => "iOS"}
    @html_position = POS_DOC + 0.1
    super
  end
end