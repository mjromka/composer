import { initComposer } from '@playbooks/action-cards-builder/src/main.tsx'

initComposer('root', {
    dataUrl: '/data.json',
    onChange: (data, info) => {
        console.log('💾', data, info)
    },
})