import vcCake from 'vc-cake'
import ReactDOM from 'react-dom'
import React from 'react'
import BackendClassicSwitcher from './lib/helpers/backendSwitcher/backendClassicSwitcher'
import FrontendClassicSwitcher from './lib/helpers/frontendSwitcher/frontendClassicSwitcher'

vcCake.add('backendSwitcher', (api) => {
  let titleDiv = document.querySelector('div#titlediv')
  let switcherContainer = document.createElement('div')
  switcherContainer.className = 'vcv-wpbackend-switcher-container'
  let render = false
  if (titleDiv) {
    titleDiv.parentNode.insertBefore(switcherContainer, titleDiv.nextSibling)
    render = true
  } else {
    let postBodyContent = document.getElementById('post-body-content')
    if (postBodyContent) {
      if (postBodyContent.firstChild) {
        postBodyContent.insertBefore(switcherContainer, postBodyContent.firstChild)
      } else {
        postBodyContent.appendChild(switcherContainer)
      }
      render = true
    }
  }
  if (render) {
    if (vcCake.env('TF_DISABLE_BACKEND')) {
      ReactDOM.render(
        <FrontendClassicSwitcher />,
        switcherContainer
      )
    } else {
      ReactDOM.render(
        <BackendClassicSwitcher />,
        switcherContainer
      )
    }
  }
})
