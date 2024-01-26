///React
import { useState, useEffect } from 'react';
//Named
import { useSnackbar } from 'notistack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//Mui
import { Stack, TextField, MenuItem, IconButton, Tooltip } from '@mui/material';
///Default
import PropTypes from 'prop-types';
import Iconify from 'src/components/iconify/Iconify';

// props
UserTableToolbar.propTypes = {
    filterFunction: PropTypes.func,
};

export default function UserTableToolbar({ filterFunction, clearFilter, downloadExcel }) {
    const [filterModel, setFilterModel] = useState({});
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (filterModel) {
                filterFunction(filterModel);
            }
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
    }, [filterModel]);

    const handlingFilterChange = (name, value) => {
        setFilterModel({ ...filterModel, [name]: value });
    };

    const isValid = (size, value, type) => {
        if (value) {
            if (value?.length < size) {
                handlingFilterChange(type, value);
            } else {
                enqueueSnackbar(`${size}-с их тэмдэгт оруулж болохгүй`, { variant: 'warning' });
            }
        } else {
            handlingFilterChange(type, '');
        }
    };
    const clearFunction = () => {
        clearFilter();
        setFilterModel('');
    };

    return (
        <Stack flexDirection="row" justifyContent="space-between">
            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 3, mb: 3 }}>
                <DatePicker
                    label="Эхлэх өдөр"
                    maxDate={Date.now()}
                    value={filterModel?.startDate ? filterModel?.startDate : null}
                    ampm={false}
                    onChange={(event) => handlingFilterChange('startDate', event)}
                    renderInput={(params) => (
                        <TextField {...params} fullWidth sx={{ maxWidth: { xs: 180, md: 200 } }} InputLabelProps={{ shrink: true }} />
                    )}
                />

                <DatePicker
                    label="Дуусах өдөр"
                    ampm={false}
                    minDate={filterModel?.startDate}
                    value={filterModel?.endDate ? filterModel?.endDate : null}
                    onChange={(event) => handlingFilterChange('endDate', event)}
                    renderInput={(params) => (
                        <TextField {...params} fullWidth sx={{ maxWidth: { xs: 180, md: 200 } }} InputLabelProps={{ shrink: true }} />
                    )}
                />
                <TextField
                    fullWidth
                    label="Bpay ID"
                    sx={{
                        maxWidth: 220,
                    }}
                    value={filterModel?.bpay_code ? filterModel?.bpay_code : ''}
                    onChange={(event) => isValid(100, event.target.value, 'bpay_code')}
                />

                <TextField
                    fullWidth
                    label="Имэил хаяг"
                    sx={{
                        maxWidth: 220,
                    }}
                    value={filterModel?.email ? filterModel?.email : ''}
                    onChange={(event) => handlingFilterChange('email', event.target.value)}
                />

                <TextField
                    fullWidth
                    label="Утасны дугаар"
                    sx={{
                        maxWidth: 220,
                    }}
                    value={filterModel?.phone_number ? filterModel?.phone_number : ''}
                    onChange={(event) => handlingFilterChange('phone_number', event.target.value)}
                />

                <IconButton onClick={clearFunction} sx={{ mt: 4, maxHeight: 60 }}>
                    <Iconify icon="tabler:reload" align="center" />
                </IconButton>
            </Stack>
        </Stack>
    );
}
