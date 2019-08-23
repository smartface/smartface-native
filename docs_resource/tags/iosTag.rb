require "jsduck/tag/boolean_tag"

class PlatformiOS < JsDuck::Tag::BooleanTag
  def initialize
    @pattern = "ios"
    @signature = {:long => "iOS", :short => "iOS"}
    @html_position = POS_DOC + 0.1
    super
  end
end

class VersionLevelIOS11 < JsDuck::Tag::BooleanTag
  def initialize
    @pattern = "minios11"
    @signature = {:long => "min-iOS-11", :short => "min-iOS-11"}
    @html_position = POS_DOC + 0.1
    super
  end
end

class VersionLevelIOS12 < JsDuck::Tag::BooleanTag
  def initialize
    @pattern = "minios12"
    @signature = {:long => "min-iOS-12", :short => "min-iOS-12"}
    @html_position = POS_DOC + 0.1
    super
  end
end