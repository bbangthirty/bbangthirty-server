/**
 * @swagger
 * /feeds:
 *   post:
 *     tags:
 *       - feeds
 *     name: 빵떠리 피드를 등록합니다.
 *     summary: 빵떠리 피드를 등록합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: 피드 정보 입력, (feed_img는 feedImg api에서 res(이미지 url)받아서 넣으면 됨)
 *         required: true
 *         schema:
 *           type: object
 *           example:
 *               {
 *                   "feed_info" : {
 *                       "bakery_id" : 3,
 *                       "feed_img" : "",
 *                       "feed_endtime" : "22:00",
 *                       "discount" : "20",
 *                       "breads" : "소보루,피자빵"
 *                     }
 *               }
 *     responses:
 *       '200':
 *         description: 빵떠리 피드 등록 완료
 *       '404':
 *         description: 빵떠리 피드 등록 실패
 *
 *   get:
 *     tags:
 *       - feeds
 *     name: 빵떠리 당일 등록한 우리 가게 피드를 가져옵니다.
 *     summary: 빵떠리 당일 등록한 우리 가게 피드를 가져옵니다.
 *     parameters:
 *       - name: bakery_id
 *         in: query
 *         description:
 *         required: true
 *     responses:
 *       '200':
 *         description: 당일 등록한 우리 가게 피드 가져오기 완료
 *       '404':
 *         description: 당일 등록한 우리 가게 피드 가져오기  실패
 *
 *   put:
 *     tags:
 *       - feeds
 *     name: 빵떠리 피드를 수정합니다.
 *     summary: 빵떠리 피드를 수정합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: 수정할 피드 정보 입력 (feed_img는 feedImg api에서 res(이미지 url)받아서 넣으면 됨)
 *         required: true
 *         schema:
 *           type: object
 *           example:
 *               {
 *                   "feed_info" : {
 *                       "feed_id" : 2,
 *                       "feed_img" : "",
 *                       "feed_endtime" : "22:00",
 *                       "discount" : "20",
 *                       "breads" : "소보루,피자빵"
 *                     }
 *               }
 *     responses:
 *       '200':
 *         description: 빵떠리 피드 수정 완료
 *       '404':
 *         description: 빵떠리 피드 수정 실패
 *
 * /feeds/{feed_id}/soldout:
 *    put:
 *     tags:
 *       - feeds
 *     name: 빵떠리 피드 상태를 품절로 변경합니다.
 *     summary: 빵떠리 피드 상태를 품절로 변경합니다.
 *     parameters:
 *       - name: feed_id
 *         in: path
 *         description: 품절 버튼 누르면 path로 feed_id 전달
 *         required: true
 *     responses:
 *       '200':
 *         description: 빵떠리 피드 품절 처리 완료
 *       '404':
 *         description: 빵떠리 피드 품절 처리 실패
 *
 * /feeds/{feed_id}/restore:
 *    put:
 *     tags:
 *       - feeds
 *     name: 빵떠리 품절처리 했던 피드를 원래대로 복구시킵니다.
 *     summary: 빵떠리 품절처리 했던 피드를 원래대로 복구시킵니다.
 *     parameters:
 *       - name: feed_id
 *         in: path
 *         description: 복구 버튼 누르면 path로 feed_id 전달
 *         required: true
 *     responses:
 *       '200':
 *         description: 빵떠리 피드 복구 완료
 *       '404':
 *         description: 빵떠리 피드 복구 실패
 *
 * /feeds/{feed_id}:
 *    delete:
 *     tags:
 *       - feeds
 *     name: 빵떠리 피드를 삭제합니다.
 *     summary: 빵떠리 피드를 삭제합니다.
 *     parameters:
 *       - name: feed_id
 *         in: path
 *         description: 삭제 버튼 누르면 path로 feed_id 전달
 *         required: true
 *     responses:
 *       '200':
 *         description: 빵떠리 피드 삭제 완료
 *       '404':
 *         description: 빵떠리 피드 삭제 실패
 *
 * /feeds/history:
 *    get:
 *     tags:
 *       - feeds
 *     name: 빵떠리 피드 등록 히스토리를 가져옵니다.
 *     summary: 빵떠리 피드 등록 히스토리를 가져옵니다.
 *     parameters:
 *       - name: bakery_id
 *         in: query
 *         description:
 *         required: true
 *     responses:
 *       '200':
 *         description: 빵떠리 히스토리 가져오기 완료
 *       '404':
 *         description: 빵떠리 히스토리 가져오기 실패
 *
 * /feeds/all:
 *    get:
 *     tags:
 *       - feeds
 *     name: 당일 등록된 빵떠리의 모든 피드를 가져옵니다.
 *     summary: 당일 등록된 빵떠리의 모든 피드를 가져옵니다.
 *     responses:
 *       '200':
 *         description: 당일 등록된 빵떠리의 모든 피드 가져오기 완료
 *       '404':
 *         description: 당일 등록된 빵떠리의 모든 피드 가져오기 실패
 *
 * /feeds/breadName/{bread_name}:
 *   get:
 *     tags:
 *       - feeds
 *     name: 관심빵 태그를 클릭하면 태그명이 포함된 피드를 보여줍니다.
 *     summary: 관심빵 태그를 클릭하면 태그명이 포함된 피드를 보여줍니다.
 *     parameters:
 *       - name: bread_name
 *         in: path
 *         description:
 *         required: true
 *     responses:
 *       '200':
 *         description: 관심빵 태그로 필터링된 피드 가져오기 완료
 *       '404':
 *         description: 관심빵 태그로 필터링된 피드 가져오기  실패
 *
 * /feeds/myArea:
 *   get:
 *     tags:
 *       - feeds
 *     name: 회원 - 등록된 동네의 피드를 가져옵니다.
 *     summary: 회원 - 등록된 동네의 피드를 가져옵니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: /myAreas api results 그대로 사용하면 됨
 *         required: true
 *         schema:
 *           type: object
 *           example:
 *               {
 *                  "sido_name" : "경기도",
 *                  "sigg_name" : "안양시 동안구",
 *                  "emd_name" : "호계동"
 *               }
 *     responses:
 *       '200':
 *         description: 등록된 동네의 피드 가져오기 완료
 *       '404':
 *         description: 등록된 동네의 피드 가져오기  실패
 *
 * /feeds/area/{area_id}:
 *   get:
 *     tags:
 *       - feeds
 *     name: 비회원 - 검색 설정한 동네 피드를 가져옵니다.
 *     summary: 비회원 - 검색 설정한 동네 피드를 가져옵니다.
 *     parameters:
 *       - name: area_id
 *         in: path
 *         description:
 *         required: true
 *     responses:
 *       '200':
 *         description: 검색 설정한 동네 피드 가져오기 완료
 *       '404':
 *         description: 검색 설정한 동네 피드 가져오기  실패
 *
 * /feeds/fvBakery:
 *   get:
 *     tags:
 *       - feeds
 *     name: 단골빵집의 피드를 가져옵니다.
 *     summary: 단골빵집의 피드를 가져옵니다.
 *     responses:
 *       '200':
 *         description: 단골빵집 피드 가져오기 완료
 *       '404':
 *         description: 단골빵집 피드 가져오기  실패
 */
