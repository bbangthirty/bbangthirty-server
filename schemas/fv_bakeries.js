/**
 * @swagger
 * /fvBakeries/{bakery_id}/like:
 *   post:
 *     tags:
 *       - fvBakeries
 *     name: 단골빵집으로 등록합니다. ♥️
 *     summary: 단골빵집으로 등록합니다. ♥️
 *     parameters:
 *       - name: bakery_id
 *         in: path
 *         description:
 *         required: true
 *     responses:
 *       '200':
 *         description: 단골빵집 등록 완료
 *       '404':
 *         description: 단골빵집 등록 실패
 *
 * /fvBakeries/{bakery_id}/unlike:
 *   post:
 *     tags:
 *       - fvBakeries
 *     name: 단골빵집 등록을 해제합니다. 🤍
 *     summary: 단골빵집 등록을 해제합니다. 🤍
 *     parameters:
 *       - name: bakery_id
 *         in: path
 *         description:
 *         required: true
 *     responses:
 *       '200':
 *         description: 단골빵집 해제 완료
 *       '404':
 *         description: 단골빵집 해제 실패
 */
