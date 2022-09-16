/**
 * @swagger
 * /albaAuth/invite/alba:
 *   post:
 *     tags:
 *       - albaAuth
 *     name: 알바생 초대
 *     summary: 알바생 초대
 *     parameters:
 *       - name: body
 *         in: body
 *         description:
 *         required: true
 *         schema:
 *           type: object
 *           example:
 *               {
 *                    "bakery_id" : 3,
 *                    "bakery_name" : "안양빵집",
 *                    "user_mail" : "mojaeya@gmail.com"
 *               }
 *     responses:
 *       '200':
 *         description: 알바생 초대 완료
 *       '404':
 *         description: 알바생 초대 실패
 *
 * /albaAuth/accept/{token}:
 *   post:
 *     tags:
 *       - albaAuth
 *     name: 알바생 수락
 *     summary: 알바생 수락
 *     parameters:
 *       - name: bakery_id
 *         in: query
 *         description:
 *         required: true
 *         type: number
 *       - name: token
 *         in: path
 *         description:
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: 알바생 수락 완료
 *       '404':
 *         description: 알바생 수락 실패
 */
