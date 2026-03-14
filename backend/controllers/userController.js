const db = require("../config/db");
const bcrypt = require("bcryptjs");

// GET USER PROFILE
exports.getProfile = (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  const sql = "SELECT id, email, created_at FROM users WHERE id = ?";

  db.query(sql, [userId], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(data[0]);
  });
};

// UPDATE USER PROFILE
exports.updateProfile = (req, res) => {
  const userId = req.user?.id;
  const { email } = req.body;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  if (!email) {
    return res.status(400).json({
      message: "Email is required"
    });
  }

  const sql = "UPDATE users SET email = ? WHERE id = ?";

  db.query(sql, [email, userId], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          message: "Email already exists"
        });
      }
      return res.status(500).json(err);
    }

    res.status(200).json({
      message: "Profile updated successfully"
    });
  });
};

// CHANGE PASSWORD
exports.changePassword = (req, res) => {
  const userId = req.user?.id;
  const { currentPassword, newPassword } = req.body;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      message: "Current and new password are required"
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      message: "New password must be at least 6 characters"
    });
  }

  const sql = "SELECT password_hash FROM users WHERE id = ?";

  db.query(sql, [userId], async (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (data.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const valid = await bcrypt.compare(currentPassword, data[0].password_hash);

    if (!valid) {
      return res.status(401).json({
        message: "Current password is incorrect"
      });
    }

    bcrypt.hash(newPassword, 10, (err, hash) => {
      if (err) {
        return res.status(500).json(err);
      }

      const updateSql = "UPDATE users SET password_hash = ? WHERE id = ?";

      db.query(updateSql, [hash, userId], (err) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.status(200).json({
          message: "Password changed successfully"
        });
      });
    });
  });
};

// GET USER STATS
exports.getUserStats = (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  const sql = "SELECT COUNT(*) as total_notes FROM notes WHERE user_id = ?";

  db.query(sql, [userId], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json({
      total_notes: data[0].total_notes
    });
  });
};