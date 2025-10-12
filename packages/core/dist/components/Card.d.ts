import React from 'react';
import { CardProps as MuiCardProps } from '@mui/material';
export interface CardProps extends MuiCardProps {
    /**
     * 卡片标题
     */
    title?: string;
    /**
     * 卡片副标题
     */
    subtitle?: string;
    /**
     * 卡片操作区域
     */
    actions?: React.ReactNode;
    /**
     * 是否显示边框
     */
    bordered?: boolean;
    /**
     * 是否显示阴影
     */
    shadow?: boolean;
}
declare const Card: React.ForwardRefExoticComponent<Omit<CardProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Card };
//# sourceMappingURL=Card.d.ts.map