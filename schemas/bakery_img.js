/**
 * @swagger
 * /bakeryImg:
 *   post:
 *     tags:
 *       - bakeryImg
 *     name: 회원가입-입점 신청 중 가게 상세정보에 들어갈 이미지를 등록합니다.
 *     summary: 회원가입-입점 신청 중 가게 상세정보에 들어갈 이미지를 등록합니다.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: img
 *         in: formData
 *         description: 빵집 이미지 파일
 *         required: true
 *         type: file
 *     responses:
 *       '200':
 *         description: 빵집 이미지 등록 완료
 *       '404':
 *         description: 빵집 이미지 등록 실패
 */
