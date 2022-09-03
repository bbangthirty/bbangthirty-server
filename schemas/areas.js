/**
 * @swagger
 * /areas/search:
 *   get:
 *     tags:
 *       - 동네 검색
 *     name: Get area
 *     summary: Get area
 *     parameters:
 *       - name: name
 *         in: query
 *         description: 동명(읍,면)으로 검색(ex.호계동)
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Get area
 *       '404':
 *         description: fail
 *
 */
