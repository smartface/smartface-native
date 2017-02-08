require "jsduck/tag/boolean_tag"

class PlatformAndroid < JsDuck::Tag::BooleanTag
  def initialize
    @pattern = "android"
    @signature = {:long => "android", :short => "and"}
    @html_position = POS_DOC + 0.1
    super
  end
end