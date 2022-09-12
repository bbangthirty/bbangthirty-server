/**
 * @swagger
 * /owners/join:
 *   post:
 *     tags:
 *       - owners
 *     name: 회원가입
 *     summary: 회원가입
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: 유저 정보, 빵집 정보, 빵집 주소 (bakery_img는 bakeryImg api에서 res(이미지 url)받아서 넣으면 됨)
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user_nickname:
 *               type: string
 *             user_mail:
 *               type: string
 *             user_pwd:
 *               type: string
 *           example:
 *               {
 *                 "owner_info" : {
 *                     "user_nickname" : "안양빵집사장",
 *                     "user_mail" : "anyang@gmail.com",
 *                     "user_pwd" : "1234"
 *                  },
 *                 "bakery_info" : {
 *                     "bakery_name" : "안양빵집",
 *                     "bakery_phone" : "010-1234-1234",
 *                     "bakery_endtime" : "22:00",
 *                     "bakery_location" : "범계역 2번 출구에서 200m",
 *                     "bakery_img" : ""
 *                 },
 *                "bakery_address" : {
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
 */
