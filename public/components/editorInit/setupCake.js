import vcCake from 'vc-cake'
import globalStoreInstance from 'public/editor/stores/globalStoreInstance'
export const setupCake = () => {
  vcCake.env('globalStore', globalStoreInstance)
  vcCake.env('platform', 'wordpress').start(() => {
    vcCake.env('editor', 'frontend')
    require('../../editor/stores/fieldOptionsStorage')
    require('../../editor/stores/events/eventsStorage')
    require('../../editor/stores/elements/elementsStorage')
    require('../../editor/stores/assets/assetsStorage')
    require('../../editor/stores/shortcodesAssets/storage')
    require('../../editor/stores/cacheStorage')
    require('../../editor/stores/migrationStorage')
    require('../../editor/stores/workspaceStorage')
    require('../../editor/stores/hub/hubElementsStorage')
    require('../../editor/stores/hub/hubTemplatesStorage')
    require('../../editor/stores/hub/hubAddonsStorage')
    require('../../editor/stores/sharedAssets/storage')
    require('../../editor/stores/history/historyStorage')
    require('../../editor/stores/settingsStorage')
    require('../../editor/stores/attributes/attributesStorage')
    require('../../editor/stores/wordpressData/wordpressDataStorage')
    require('../../editor/stores/elements/elementSettings')
    require('../../editor/stores/popup/storage')
    require('../../editor/stores/editorPopup/storage')
    // require('./editor/stores/elementsLoader/elementsLoaderStorage')
    require('../../editor/stores/insights/storage')
    const hubElementsStorage = vcCake.getStorage('hubElements')
    hubElementsStorage.trigger('start')
    const hubTemplatesStorage = vcCake.getStorage('hubTemplates')
    hubTemplatesStorage.trigger('start')
    const hubAddonsStorage = vcCake.getStorage('hubAddons')
    hubAddonsStorage.trigger('start')
    const sharedAssetsStorage = vcCake.getStorage('sharedAssets')
    sharedAssetsStorage.trigger('start')
    const settingsStorage = vcCake.getStorage('settings')
    settingsStorage.trigger('start')
    const attributesStorage = vcCake.getStorage('attributes')
    attributesStorage.trigger('start')
    require('../../config/wp-modules')
  })
}
