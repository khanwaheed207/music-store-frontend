CREATE TABLE CART(
  cartId               INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userId               INTEGER NOT NULL,
  productId            INTEGER NOT NULL,
  quantity             INTEGER DEFAULT 1,
  FOREIGN KEY (userId) REFERENCES USERS(userId),
  FOREIGN KEY (productId) REFERENCES PRODUCTS(productId)
);