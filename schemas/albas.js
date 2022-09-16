/**
 * @swagger
 * /albas/daegi:
 *   get:
 *     tags:
 *       - albas
 *     name: 수락 대기 상태인 알바 목록을 가져옵니다.
 *     summary: 수락 대기 상태인 알바 목록을 가져옵니다.
 *     parameters:
 *       - name: bakery_id
 *         in: query
 *         description:
 *         required: true
 *         type: number
 *     responses:
 *       '200':
 *         description: 수락 대기 상태인 알바 목록을 가져왔습니다.
 *       '404':
 *         description: 수락 대기 상태인 알바 목록을 가져오는데 실패했습니다.
 *
 * /albas/confirm:
 *   get:
 *     tags:
 *       - albas
 *     name: 수락 상태인 알바 목록을 가져옵니다.
 *     summary: 수락 상태인 알바 목록을 가져옵니다.
 *     parameters:
 *       - name: bakery_id
 *         in: query
 *         description:
 *         required: true
 *         type: number
 *     responses:
 *       '200':
 *         description: 수락 상태인 알바 목록을 가져왔습니다.
 *       '404':
 *         description: 수락 상태인 알바 목록을 가져오는데 실패했습니다.
 *
 * /albas/{alba_id}:
 *    delete:
 *     tags:
 *       - albas
 *     name: 알바생을 삭제합니다.
 *     summary: 알바생을 삭제합니다.
 *     parameters:
 *       - name: alba_id
 *         in: path
 *         description: 계속 대기 상태인 잠수 알바 or 기존 알바 삭제에 쓰임
 *         required: true
 *     responses:
 *       '200':
 *         description: 알바생 삭제 완료
 *       '404':
 *         description: 알바생 삭제 실패
 */
