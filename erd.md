# Database Entity Relationship Diagram (ERD)

## Collections

### Users

- `_id`: ObjectId
- `username`: String (Unique)
- `email`: String (Unique)
- `passwordHash`: String
- `role`: Enum ['Admin', 'Seller', 'Bidder']
- `avatarUrl`: String
- `isVerified`: Boolean
- `createdAt`: Date
- `updatedAt`: Date

### Auctions

- `_id`: ObjectId
- `sellerId`: ObjectId (Ref: Users)
- `title`: String
- `description`: String
- `images`: Array of Strings (Cloudinary URLs)
- `startingPrice`: Number
- `reservePrice`: Number
- `currentPrice`: Number
- `topBidderId`: ObjectId (Ref: Users)
- `status`: Enum ['Draft', 'Scheduled', 'Active', 'Ended']
- `startTime`: Date
- `endTime`: Date
- `createdAt`: Date
- `updatedAt`: Date

### Bids

- `_id`: ObjectId
- `auctionId`: ObjectId (Ref: Auctions)
- `bidderId`: ObjectId (Ref: Users)
- `amount`: Number
- `timestamp`: Date

### Notifications

- `_id`: ObjectId
- `userId`: ObjectId (Ref: Users)
- `message`: String
- `type`: Enum ['Outbid', 'AuctionWon', 'System']
- `isRead`: Boolean
- `createdAt`: Date
