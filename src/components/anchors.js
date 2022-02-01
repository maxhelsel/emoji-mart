import React from 'react'
import PropTypes from 'prop-types'

export default class Anchors extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    var index = e.currentTarget.getAttribute('data-index')
    var { categories, onAnchorClick } = this.props

    onAnchorClick(categories[index], index)
  }

  render() {
    var { categories, color, i18n, icons, selectedCategory } = this.props;

    return (
      <nav className="emoji-mart-anchors" aria-label={i18n.categorieslabel}>
        {categories.map((category, i) => {
          var { id, name, anchor } = category

          if (anchor === false) {
            return null
          }

          const isSelected = Boolean(selectedCategory && selectedCategory.name && (selectedCategory.name == name));
          const iconId = id.startsWith('custom-') ? 'custom' : id

          return (
            <button
              key={id}
              aria-label={i18n.categories[iconId]}
              title={i18n.categories[iconId]}
              data-index={i}
              type={'button'}
              onClick={this.handleClick}
              className={`emoji-mart-anchor ${
                isSelected ? 'emoji-mart-anchor-selected' : ''
              }`}
              style={{ color: isSelected ? color : null }}
            >
              <div className="emoji-mart-anchor-icon">
                {icons.categories[iconId]()}
              </div>
            </button>
          )
        })}
      </nav>
    )
  }
}

Anchors.propTypes /* remove-proptypes */ = {
  categories: PropTypes.array,
  onAnchorClick: PropTypes.func,
  icons: PropTypes.object,
}

Anchors.defaultProps = {
  categories: [],
  onAnchorClick: () => {},
  icons: {},
}
