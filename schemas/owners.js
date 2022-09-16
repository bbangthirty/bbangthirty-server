/**
 * @swagger
 * /owners/join:
 *   post:
 *     tags:
 *       - owners
 *     name: 점주 회원가입 & 업체 등록
 *     summary: 점주 회원가입 & 업체 등록
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: 유저 정보, 빵집 정보, 빵집 주소 (bakery_img는 bakeryImg api에서 res(이미지 url)받아서 넣으면 됨)
 *         required: true
 *         schema:
 *           type: object
 *           example:
 *               {
 *                 "owner_info" : {
 *                     "user_nickname" : "안양빵집사장",
 *                     "user_mail" : "anyang@gmail.com",
 *                     "user_pwd" : "1234",
 *                     "user_phone": "010-1111-1111"
 *                  },
 *                 "bakery_info" : {
 *                     "bakery_name" : "안양빵집",
 *                     "bakery_phone" : "010-1234-1234",
 *                     "bakery_endtime" : "22:00",
 *                     "bakery_location" : "범계역 2번 출구에서 200m",
 *                     "bakery_img" : ""
 *                 },
 *                "bakery_addr" : {
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
 *         description: 회원가입 및 입점 신청 완료
 *       '404':
 *         description: 회원가입 및 입점 신청 실패
 *
 * /owners/addBakery:
 *   post:
 *     tags:
 *       - owners
 *     name: 점주 업체 추가 등록
 *     summary: 점주 업체 추가 등록
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
 *                     "bakery_name" : "안양빵집2",
 *                     "bakery_phone" : "010-1234-1234",
 *                     "bakery_endtime" : "22:00",
 *                     "bakery_location" : "범계역 2번 출구에서 200m",
 *                     "bakery_img" : ""
 *                 },
 *                "bakery_addr" : {
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
 *         description: 업체 추가 등록 신청 완료
 *       '404':
 *         description: 업체 추가 등록신청 실패
 *
 * /owners/bakeryList:
 *   get:
 *     tags:
 *       - owners
 *     name: 점주의 업체 목록을 가져옵니다.
 *     summary: 점주의 업체 목록을 가져옵니다.
 *     responses:
 *       '200':
 *         description: 점주의 업체 목록을 가져왔습니다.
 *       '404':
 *         description: 점주의 업체 목록을 가져오는데 실패했습니다.
 */
