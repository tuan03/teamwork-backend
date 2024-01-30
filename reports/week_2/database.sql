-- Bảng Tài Khoản (Account)
CREATE TABLE Accounts (
    UserID INT PRIMARY KEY AUTO_INCREMENT, 
    Username VARCHAR(50) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    FullName VARCHAR(100) NOT NULL,
    BirthDay DATE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Avatar BOOLEAN DEFAULT FALSE, -- true là đánh dấu có Ảnh đại diện
    Information TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Đồ Án (Project)
CREATE TABLE Projects (
    ProjectID INT PRIMARY KEY AUTO_INCREMENT,
    ProjectName VARCHAR(100) NOT NULL,
    ProjectDescription TEXT,
    Deadline DATE,
    Completed BOOLEAN DEFAULT FALSE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng các thành viên của Project
CREATE TABLE Members (
    UserID INT,
    ProjectID INT,
    Admin INT DEFAULT 0, -- 0: member, 1: Mod, 2: Admin
    PRIMARY KEY (UserID, ProjectID),
    FOREIGN KEY (UserID) REFERENCES Accounts(UserID),
    FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID)
);

-- Bảng Công Việc (Task)
CREATE TABLE Tasks (
    TaskID INT PRIMARY KEY AUTO_INCREMENT,
    TaskName VARCHAR(100) NOT NULL,
    TaskDescription TEXT,
    Deadline DATE,
    ProjectID INT,
    AssignedUserID INT, -- id người nhận Task
    AssignedByUserID INT, --id người giao task
    Completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID),
    FOREIGN KEY (AssignedUserID) REFERENCES Accounts(UserID),
    FOREIGN KEY (AssignedByUserID) REFERENCES Accounts(UserID)
);

-- Bảng Comment
CREATE TABLE Comments (
    CommentID INT PRIMARY KEY AUTO_INCREMENT,
    TaskID INT,
    UserID INT,
    CommentText TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (TaskID) REFERENCES Tasks(TaskID),
    FOREIGN KEY (UserID) REFERENCES Accounts(UserID)
);

-- Bảng PushNotifications (Có tác dụng tạo thông báo đến cho người dùng)
CREATE TABLE PushNotifications (
    NotificationID INT PRIMARY KEY AUTO_INCREMENT,
    ReceiverID INT,
    SenderID INT,
    Content TEXT NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    IsRead BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (ReceiverID) REFERENCES Accounts(UserID),
    FOREIGN KEY (SenderID) REFERENCES Accounts(UserID)
);

-- Bảng Lịch Sử Sửa Đổi (TaskEditHistory)
CREATE TABLE TaskEditHistorys (
    EditID INT PRIMARY KEY AUTO_INCREMENT,
    TaskID INT,
    EditedByUserID INT, --id người sửa mô tả task
    TaskDescription TEXT, -- mô tả Task khi người này sửa
    EditedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (TaskID) REFERENCES Tasks(TaskID),
    FOREIGN KEY (EditedByUserID) REFERENCES Accounts(UserID)
);

-- Bảng Yêu Cầu (Requests)
CREATE TABLE Requests (
    RequestID INT PRIMARY KEY AUTO_INCREMENT,
    TaskID INT,
    StatusProcess BOOLEAN DEFAULT FALSE, -- đánh giá đã xử lý chưa
    FeedbackMessage TEXT, -- Trả về Feedback nếu Như Ad hoặc Mod không duyệt hoàn thành Tasks
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (TaskID) REFERENCES Tasks(TaskID)
);
