/**
 * @swagger
 * /areas/search/{areaName}:
 *   get:
 *     tags:
 *       - 동네 검색
 *     name: Get area
 *     summary: Get area
 *     parameters:
 *       - name: areaName
 *         in: path
 *         description: 동명(읍,면)으로 검색
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Get area
 *       '404':
 *         description: fail
 *
 */
