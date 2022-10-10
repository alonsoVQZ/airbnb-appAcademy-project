const { faker } = require('@faker-js/faker');
const { Spot, Review } = require('../../models');

const imagesArray = [
    [
        "https://a0.muscache.com/im/pictures/25625163/d4833a1c_original.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/4bfd386a-0b8a-4ebf-8814-8cead9e20fb0.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/09cef96b-3288-4a5d-a9c5-16bc857379e9.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/2b070d7d-52e0-4bd9-9c40-950ea5cbaf24.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/24164e67-fc2c-4db0-901b-57d6d033d6fa.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/97a4b034-6bdc-43ea-b2cc-0bcbbbf211b1.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/25624825/6ef8e934_original.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/25625031/190f0281_original.jpg?im_w=1440"
    ],
    [
        "https://a0.muscache.com/im/pictures/da7da2c0-a5a8-4d9c-b4ec-943593bd37bb.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/9e513715-348c-4e9e-884c-ddfdeffa2fa4.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-39794979/original/5303fcd5-27e3-4652-90ae-5998c4e00578.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/18cd95d9-b495-4731-8c66-22edb07ba71e.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/feaea55e-f50f-4503-8ddd-dd26a7601489.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/23724063-1e07-4e94-bd6f-339f507a7009.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/138a44df-d7c9-413e-9249-cd005b51daba.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/a2151929-a00a-42d9-b869-df96a64a6d94.jpg?im_w=1440"
    ],
    [
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-50150395/original/25d20367-2c62-4aa3-b315-c9817a55eeed.jpeg?im_w=1200",
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-50150395/original/5f406b9e-9257-4202-8a65-29e83f90541a.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-50150395/original/e522b9b5-cfc2-490e-9be5-8c5f24edff64.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-50150395/original/89f178f0-6b17-4ff4-9490-1a204e68ca57.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-50150395/original/fa431ee0-60bb-4ea1-8a27-af2800cb30e3.jpeg?im_w=1440"
    ],
    [
        "https://a0.muscache.com/im/pictures/55672abd-82b8-4cc4-a151-a97b82a1da80.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/0c2d49d4-730d-4c6b-8480-bb7abc943173.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-8227788/original/655b6bf0-a22b-4a91-b18b-15f62a0b60c1.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/57e0b530-1745-42af-8744-b675172a795d.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/abfaa790-045c-4715-9e0f-b6995adc67a2.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/prohost-api/Hosting-8227788/original/589c834b-fb8c-4b5f-92b7-126f654ebdc8.jpeg?im_w=1440"
    ],
    [
        "https://a0.muscache.com/im/pictures/d3f77c1a-c1aa-4adc-bdc1-85ee32eb291d.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/073f3f02-503b-4135-a138-dc0fca5af6d7.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/0e25c444-d933-4054-b4fa-471160fed27f.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-45054521/original/6f421563-fb58-4bec-a2a3-ae0f81654b49.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-45054521/original/dc1163cb-79e7-402d-a13f-95fe24b011ee.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-45054521/original/ebbf72e3-8cca-4f0e-b68c-bccb6b8252ad.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-45054521/original/3557cafa-3167-4df4-8705-747f0a2d9adb.jpeg?im_w=1440"
    ],
    [
        "https://a0.muscache.com/im/pictures/fbb0cb48-9994-40fe-bfa1-c3c150dadf8a.jpg?im_w=1200",
        "https://a0.muscache.com/im/pictures/73f43baf-1830-49e4-8feb-383438f631ff.jpg?im_w=1440",
        "https://a0.muscache.com/im/pictures/1631e861-d2ee-4ae1-b396-b6fdf438cca4.jpg?im_w=1440"
    ],
    [
        "https://a0.muscache.com/im/pictures/miso/Hosting-53098229/original/ecd7c04c-c299-4313-a7eb-ef94340e935d.jpeg?im_w=1200",
        "https://a0.muscache.com/im/pictures/miso/Hosting-53098229/original/5b8e207d-ed6c-46c3-8662-b4e4188dfff8.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-53098229/original/f7ae78dc-0264-4200-a5e0-6e09e0ab0b42.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-53098229/original/6f267e51-15a5-49e5-8223-79ff5435b0bf.jpeg?im_w=1440","https://a0.muscache.com/im/pictures/miso/Hosting-53098229/original/8bb6441c-45bd-449b-9dc6-d9159388c271.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-53098229/original/0fd0a0b1-67c9-4478-9aba-0f3971a16099.jpeg?im_w=1440"
    ],
    [
        "https://a0.muscache.com/im/pictures/miso/Hosting-639942854760967557/original/99656138-c5ba-4a0d-a10a-2d16123e484c.jpeg?im_w=1200",
        "https://a0.muscache.com/im/pictures/miso/Hosting-639942854760967557/original/7b3d71e2-64c3-4292-923d-2f2dae8ab5f0.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-639942854760967557/original/973c8489-8314-40c1-878c-0a8b8e59ee5d.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-639942854760967557/original/d09b1e77-5344-478a-8dde-13752e152a87.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-639942854760967557/original/5ab14dae-d5fe-48fc-b8e9-6bc7e6a702d5.jpeg?im_w=1440",
        "https://a0.muscache.com/im/pictures/miso/Hosting-639942854760967557/original/b23d6e8a-26d2-483c-9b00-f20fb2f5eaa9.jpeg?im_w=1440"
    ]
]

module.exports = async () => {
    const images = new Array();
    const spotsCount = await Spot.count();
    const reviewsCount = await Review.count();

    for (let i = 1; i <= spotsCount; i++) {
        const randomImages = imagesArray[Math.floor(Math.random() * imagesArray.length)];
        for (let j = 0; j < randomImages.length; j++) {
            images.push({
                url: randomImages[j],
                imageableType: 'Spot',
                imageableId: i
            })
        }
    }
    for (let i = 1; i <= reviewsCount; i++) {
        const randomImages = imagesArray[Math.floor(Math.random() * imagesArray.length)];
        for (let j = 1; j < randomImages.length; j++) {
            images.push({
                url: randomImages[j],
                imageableType: "Review",
                imageableId: i
            })
        }
    }
    return images;
}