/**
 * @swagger
 * /fvBreads:
 *   post:
 *     tags:
 *       - fvBreads
 *     name: 관심빵을 등록합니다.
 *     summary: 관심빵을 등록합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: 관심빵 태그 등록
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             bread_name:
 *               type: string
 *           example:
 *               {
 *                 bread_name : "소보루"
 *               }
 *     responses:
 *       '200':
 *         description: 관심빵 등록 완료
 *       '404':
 *         description: 관심빵 등록 실패
 *
 *   get:
 *     tags:
 *       - fvBreads
 *     name: 관심빵 목록을 가져옵니다.
 *     summary: 관심빵 목록을 가져옵니다.
 *     responses:
 *       '200':
 *         description: 관심빵 목록 가져오기 완료
 *       '404':
 *         description: 관심빵 목록 가져오기  실패
 *
 * /fvBreads/{fv_bread_id}:
 *   delete:
 *     tags:
 *       - fvBreads
 *     name: 등록된 관심빵을 삭제합니다.
 *     summary: 등록된 관심빵을 삭제합니다.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: fv_bread_id
 *         in: path
 *         description: 관심빵 태그 삭제
 *         required: true
 *     responses:
 *       '200':
 *         description: 관심빵 삭제 완료
 *       '404':
 *         description: 관심빵 삭제 실패
 *
 */
