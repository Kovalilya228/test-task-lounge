import type { Item } from '@/types/inventory'

const MOCK_ITEMS: Item[] = [
    {
        id: '1',
        name: 'Футболка',
        weight: 1,
        image: 'https://www.shutterstock.com/shutterstock/photos/2675875683/display_1500/stock-photo-black-t-shirt-short-sleeve-mockup-2675875683.jpg',
    },
    {
        id: '2',
        name: 'Пистолет',
        weight: 3,
        image: 'https://www.shutterstock.com/shutterstock/photos/2579639335/display_1500/stock-photo-modern-semi-automatic-pistol-isolate-on-a-white-background-armament-for-the-army-and-police-short-2579639335.jpg',
    },
    {
        id: '3',
        name: 'Ключи от машины',
        weight: 0.3,
        image: 'https://www.shutterstock.com/shutterstock/photos/2699923539/display_1500/stock-vector-car-key-remote-icon-sign-vector-2699923539.jpg',
    },
    {
        id: '4',
        name: 'Футболка 2',
        weight: 2,
        image: 'https://www.shutterstock.com/shutterstock/photos/2675875683/display_1500/stock-photo-black-t-shirt-short-sleeve-mockup-2675875683.jpg',
    },
    {
        id: '5',
        name: 'Пистолет 2',
        weight: 1,
        image: 'https://www.shutterstock.com/shutterstock/photos/2579639335/display_1500/stock-photo-modern-semi-automatic-pistol-isolate-on-a-white-background-armament-for-the-army-and-police-short-2579639335.jpg',
    },
    {
        id: '6',
        name: 'Ключи от машины 2',
        weight: 0.7,
        image: 'https://www.shutterstock.com/shutterstock/photos/2699923539/display_1500/stock-vector-car-key-remote-icon-sign-vector-2699923539.jpg',
    },
]

export function getMockItems(): Item[] {
    return MOCK_ITEMS.map((i) => ({ ...i }))
}

