-- 리뷰데이터 조회

-- 평균 평점
select round( AVG(rank_score),2 )as "averRank" from review group by movie_id;

-- 리뷰 조회
SELECT 
  r.id,
  r.user_id,
  r.nickname,
  r.content,
  r.rank_score,
  COUNT(rl.user_id) AS like_count,
  EXISTS (
    SELECT 1
    FROM likes l
    WHERE l.review_id = r.id AND l.user_id = "pe20SeMxcLOhfE5XSR0Gv6OU18u2"
  ) AS isLike,
    r.created_at
FROM review r
LEFT JOIN likes rl ON r.id = rl.review_id
WHERE r.movie_id = 574475
GROUP BY 
  r.id, r.user_id, r.nickname, r.content, r.rank_score, r.created_at
ORDER BY r.created_at DESC;