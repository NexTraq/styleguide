rule 'MD001' # header-incement
rule 'MD002' # first-header-h1
rule 'MD003', :style => :atx # header-style: Use # to denote header
rule 'MD004', :style => :asterisk # ul-style
rule 'MD005' # list-indent: Enforces consistent list indentation
rule 'MD006' # ul-start-left
rule 'MD007', :indent => 4 # ul-indent
rule 'MD009' # no-trailing-spaces
rule 'MD010' # no-hard-tabs
rule 'MD011' # no-reversed-links
rule 'MD012' # no-multiple-blanks

# TODO(https://github.com/markdownlint/markdownlint/issues/295): Line length rule does not trigger if there are no
                                                               # spaces after the break. But why?
rule 'MD013', :line_length => 120 # line-length

rule 'MD014' # commands-show-output: Triggers when bash code is preceded by $, unless command output is displayed
rule 'MD018' # no-missing-space-atx
rule 'MD019' # no-multiple-space-atx
rule 'MD022' # blanks-around-headers
rule 'MD023' # header-start-left
rule 'MD024' # no-duplicate-header
rule 'MD025' # single-h1
rule 'MD026' # no-trailing-punctuation: Triggers on punctuation at end of header
rule 'MD027' # no-multiple-space-blockquote
rule 'MD028' # no-blanks-blockquote
rule 'MD029' # ol-prefix: Enforces lazy ordered lists
rule 'MD030', :ul_single => 3, :ol_single => 2, :ul_multi => 3, :ol_multi => 2 # list-marker-space
rule 'MD031' # blanks-around-fences
rule 'MD032' # blanks-around-lists
rule 'MD033' # no-inline-html
rule 'MD034' # no-bare-urls: URLs must be linked
rule 'MD035' # hr-style: Enforces consistent horizontal rule style
rule 'MD036' # no-emphasis-as-header: Triggers on single lines of entirely emphasized text
rule 'MD037' # no-space-in-emphasis
rule 'MD038' # no-space-in-code
rule 'MD039' # no-space-in-link
rule 'MD041' # first-line-h1
rule 'MD046' # code-block-style: Enforces fencing for code blocks (instead of indentation)
