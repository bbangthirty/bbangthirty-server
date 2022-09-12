/**
 * @swagger
 * /admins/bakeryForEntry:
 *   get:
 *     tags:
 *       - admins
 *     name: 입점 신청한 빵집 목록을 가져옵니다.
 *     summary: 입점 신청한 빵집 목록을 가져옵니다.
 *     responses:
 *       '200':
 *         description: 입점 신청한 빵집 목록을  가져왔습니다.
 *       '404':
 *         description: 입점 신청한 빵집 목록을  가져오는데 실패했습니다.
 *
 * /admins/approve:
 *   put:
 *     tags:
 *       - admins
 *     name: 빵떠리 입점을 승인합니다.
 *     summary: 빵떠리 입점을 승인합니다.
 *     parameters:
 *       - name: bakery_id
 *         in: query
 *         required: true
 *         type: number
 *     responses:
 *       '200':
 *         description: 빵떠리 입점 승인 완료
 *       '404':
 *         description: 빵떠리 입점 승인 실패
 *
 * /admins/disapprove:
 *   put:
 *     tags:
 *       - admins
 *     name: 빵떠리 입점 승인을 취소합니다.
 *     summary: 빵떠리 입점 승인을 취소합니다.
 *     parameters:
 *       - name: bakery_id
 *         in: query
 *         required: true
 *         type: number
 *     responses:
 *       '200':
 *         description: 빵떠리 입점 취소 완료
 *       '404':
 *         description: 빵떠리 입점 취소 실패
 */
