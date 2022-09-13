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
 *                       "breads" : "소보루, 피자빵"
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
 *     name: 빵떠리 당일 등록한 피드 정보를 가져옵니다.
 *     summary: 빵떠리 당일 등록한 피드 정보를 가져옵니다.
 *     responses:
 *       '200':
 *         description: 당일 등록한 피드 정보 가져오기 완료
 *       '404':
 *         description: 당일 등록한 피드 정보 가져오기  실패
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
 *                       "lose_bread_img" : "",
 *                       "feed_endtime" : "22:00",
 *                       "discount" : "20",
 *                       "breads" : "소보루, 피자빵"
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
 */
