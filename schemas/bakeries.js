/**
 * @swagger
 * /bakeries/{bakery_id}:
 *   get:
 *     tags:
 *       - bakeries
 *     name: 가게 정보를 가져옵니다.
 *     summary: 가게 정보를 가져옵니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: bakery_id
 *         in: path
 *         description: 가게정보 수정 페이지에서 불러오기
 *         required: true
 *     responses:
 *       '200':
 *         description: 가게 정보 가져오기 완료
 *       '404':
 *         description: 가게 정보 가져오기 실패
 *
 * /bakeries:
 *   put:
 *     tags:
 *       - bakeries
 *     name: 가게 정보를 수정합니다.
 *     summary: 가게 정보를 수정합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: 빵집 정보, 빵집 주소 (bakery_img는 bakeryImg api에서 res(이미지 url)받아서 넣으면 됨)
 *         required: true
 *         schema:
 *           type: object
 *           example:
 *               {
 *                 "bakery_info" : {
 *                     "bakery_id" : 3,
 *                     "bakery_name" : "안양빵집2",
 *                     "bakery_phone" : "010-1234-1234",
 *                     "bakery_endtime" : "22:00",
 *                     "bakery_location" : "범계역 2번 출구에서 200m",
 *                     "bakery_img" : ""
 *                 },
 *                "bakery_addr" : {
 *                     "bakery_addr_id" : 3,
 *                     "zone_code" : "44812",
 *                     "jibun_address" : "경기도 안양시 동안구 호계동 846",
 *                     "road_address" : "경기 안양시 동안구 가구단지길 31",
 *                     "detail_address" : "1동 302호",
 *                     "sido_name" : "안양시",
 *                     "sigg_name" : "동안구",
 *                     "emd_name" : "호계동"
 *                 }
 *               }
 *     responses:
 *       '200':
 *         description: 가게 정보 수정 완료
 *       '404':
 *         description: 가게 정보 수정 실패
 */
