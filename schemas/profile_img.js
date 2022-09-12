/**
 * @swagger
 * /profileImg:
 *   post:
 *     tags:
 *       - profileImg
 *     name: 프로필 이미지를 등록합니다.
 *     summary: 프로필 이미지를 등록합니다.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: img
 *         in: formData
 *         description: 프로필 이미지 파일
 *         required: true
 *         type: file
 *     responses:
 *       '200':
 *         description: 프로필 이미지 등록 완료
 *       '404':
 *         description: 프로필 이미지 등록 실패
 *
 *   delete:
 *     tags:
 *       - profileImg
 *     name: 프로필 이미지를 삭제하고 기본 이미지로 돌아갑니다.
 *     summary: 프로필 이미지를 삭제하고 기본 이미지로 돌아갑니다.
 *     responses:
 *       '200':
 *         description: 프로필 이미지 삭제 완료
 *       '404':
 *         description: 프로필 이미지 삭제 실패
 *
 *   put:
 *     tags:
 *       - profileImg
 *     name: 프로필 이미지를 변경합니다.
 *     summary: 프로필 이미지를 변경합니다.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: img
 *         in: formData
 *         description: 프로필 이미지 파일
 *         required: true
 *         type: file
 *     responses:
 *       '200':
 *         description: 프로필 이미지 등록 완료
 *       '404':
 *         description: 프로필 이미지 등록 실패
 */
