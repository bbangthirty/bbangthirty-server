/**
 * @swagger
 * /areas/search/{areaName}:
 *   get:
 *     tags:
 *       - areas
 *     name: 동네 목록을 가져옵니다.
 *     summary: 동네 목록을 가져옵니다.
 *     parameters:
 *       - name: areaName
 *         in: path
 *         description: 동명(읍,면)으로 검색
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: 동네 목록을 가져왔습니다.
 *       '404':
 *         description: 동네 목록을 가져오는데 실패했습니다.
 *
 */
