import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Stack, Button, Typography, CardActionArea } from '@mui/material';
// default import
import PropTypes from 'prop-types';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/menu-popover';
import FileThumbnail from 'src/components/file-thumbnail';
import FileFilterButton from './FileFilterButton';

// ----------------------------------------------------------------------

FileFilterType.propTypes = {
    onReset: PropTypes.func,
    filterType: PropTypes.array,
    onFilterType: PropTypes.func,
    optionsType: PropTypes.array,
};

export default function FileFilterType({ optionsType, filterType, onFilterType, onReset }) {
    const [openPopover, setOpenPopover] = useState(null);
    const isSelected = !!filterType.length;
    const renderLabel = filterType.length ? filterType.slice(0, 2).join(',') : 'Төрөл';

    // functions
    const handleOpenPopover = (event) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    return (
        <>
            <FileFilterButton
                isSelected={isSelected}
                endIcon={<Iconify icon={openPopover ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
                onClick={handleOpenPopover}
                sx={{ minWidth: 120 }}
            >
                {renderLabel}
                {filterType.length > 2 && (
                    <Label color='info' sx={{ ml: 1 }}>
                        +{filterType.length - 2}
                    </Label>
                )}
            </FileFilterButton>

            <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ p: 2.5 }}>
                <Stack spacing={2.5}>
                    <Box display='grid' gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }} gap={1}>
                        {optionsType.map((type) => {
                            const selected = filterType.includes(type);
                            return (
                                <CardActionArea
                                    key={type}
                                    onClick={() => onFilterType(type)}
                                    sx={{
                                        p: 1,
                                        borderRadius: 1,
                                        cursor: 'pointer',
                                        color: 'text.secondary',
                                        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
                                        ...(selected && {
                                            color: 'text.primary',
                                            bgcolor: 'action.selected',
                                        }),
                                    }}
                                >
                                    <Stack spacing={0.5} direction='row' alignItems='center'>
                                        <FileThumbnail file={type} wSize={32} />
                                        <Typography variant='body2'>{type}</Typography>
                                    </Stack>
                                </CardActionArea>
                            );
                        })}
                    </Box>

                    <Stack spacing={1} direction='row' alignItems='center' justifyContent='flex-end'>
                        <Button variant='outlined' color='inherit' onClick={onReset}>
                            Цэвэрлэх
                        </Button>

                        <Button variant='contained' onClick={handleClosePopover}>
                            Хаах
                        </Button>
                    </Stack>
                </Stack>
            </MenuPopover>
        </>
    );
}
