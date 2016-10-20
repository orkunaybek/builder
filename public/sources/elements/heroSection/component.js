/* global React, vcvAPI */
/*eslint no-unused-vars: 0*/
class Component extends vcvAPI.elementComponent {
  render () {
    let {id, atts, editor} = this.props
    let {title, description, image, align, addButton, customClass, designOptions, button} = atts
    let classNames = require('classnames')
    let customProps = {}

    let wrapperClasses = classNames({
      'vce': true,
      'vce-hero-section': true,
      'vce-hero-section--min-height': true,
      'vce-hero-section--alignment-start': align === 'start',
      'vce-hero-section--alignment-end': align === 'end'
    })

    let rowClasses = classNames({
      'vce-hero-section__wrap-row': true
    })

    if (typeof customClass === 'string' && customClass) {
      wrapperClasses = wrapperClasses.concat(' ' + customClass)
    }

    let rowStyles = {}
    if (image) {
      let imgSrc = this.getImageUrl(image)
      rowStyles.backgroundImage = `url(${imgSrc})`
    }

    let buttonOutput = ''
    if (addButton) {
      let vcCake = require('vc-cake')
      const Cook = vcCake.getService('cook')
      let Button = Cook.get(button)
      buttonOutput = Button.render(null, false)
    }
    let devices = designOptions.visibleDevices ? Object.keys(designOptions.visibleDevices) : []
    let animations = []
    devices.forEach((device) => {
      let prefix = designOptions.visibleDevices[ device ]
      if (designOptions[ device ].animation) {
        if (prefix) {
          prefix = `-${prefix}`
        }
        animations.push(`vce-o-animate--${designOptions[ device ].animation}${prefix}`)
      }
    })
    if (animations.length) {
      customProps[ 'data-vce-animate' ] = animations.join(' ')
    }
    return <section className={wrapperClasses} id={'el-' + id} {...editor}>
      <div className={rowClasses} style={rowStyles} {...customProps}>
        <div className="vce-hero-section__wrap">
          <div className="vce-hero-section__content">
            {title}
            {description}
            {buttonOutput}
          </div>
        </div>
      </div>
    </section>
  }
  getPublicImage (filename) {
    const vcCake = require('vc-cake')
    const assetsManager = vcCake.getService('assets-manager')
    var {tag} = this.props.atts
    return assetsManager.getPublicPath(tag, filename)
  }
  getImageUrl (image) {
    let imageUrl
    // Move it to attribute
    if (image && image.full) {
      imageUrl = image.full
    } else {
      imageUrl = this.getPublicImage(image)
    }
    return imageUrl
  }
}

