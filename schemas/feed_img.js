/**
 * @swagger
 * /feedImg:
 *   post:
 *     tags:
 *       - feedImg
 *     name: 당일 빵떠리 등록 피드에 들어갈 이미지를 등록합니다.
 *     summary: 당일 빵떠리 등록 피드에 들어갈 이미지를 등록합니다.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: img
 *         in: formData
 *         description: 마감 빵 사진
 *         required: true
 *         type: file
 *     responses:
 *       '200':
 *         description: 마감빵 이미지 등록 완료
 *       '404':
 *         description: 마감빵 이미지 등록 실패
 */
