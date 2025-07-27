// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config'; // כדי לגשת ל-SUPABASE_JWT_SECRET

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // מצפה לטוקן בכותרת Authorization: Bearer
      ignoreExpiration: false, // לא מתעלם מתוקף הטוקן (המלצה ביטחונית)
      secretOrKey: configService.get<string>('SUPABASE_JWT_SECRET')!, // הסוד לאימות הטוקן
    });
  }

  // פונקציה זו מופעלת לאחר שהטוקן אומת ונפוענח בהצלחה
  async validate(payload: any) {
    // ה-`payload` מכיל את המידע מתוך ה-JWT (כמו `sub`, `email`, `role` מ-Supabase)
    // `sub` הוא ה-user_id (UUID) של Supabase Auth.
    // ניתן להוסיף כאן לוגיקה נוספת, כמו:
    // - בדיקה שהמשתמש עדיין קיים ב-DB שלך (אם הייתה לך טבלת משתמשים)
    // - הטענת פרטי משתמש נוספים אם נדרש
    
    // אנו נחזיר את המידע שרלוונטי לנו, והוא יהיה זמין ב-`req.user`
    return { userId: payload.sub, email: payload.email, role: payload.role }; 
  }
}
